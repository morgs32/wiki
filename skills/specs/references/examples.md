# Examples: choose the owner of the promise

These examples use Effect 4 and Vitest conventions. The reservation example is
self-contained illustrative code, not a Zerospin SDK export. The RPC excerpt
uses the current SystemApi fixture; the SDK examples use real authored exports.
Adapt fixture setup and imports to the active checkout rather than introducing
shared test helpers just for these examples.

## Internal method: valid props, two outcomes

The constructor admits positive integer quantities. Available stock is a business
decision made later. Both specs supply valid props; only one succeeds.

```ts
import { it } from '@effect/vitest';
import { Effect, Exit, Schema } from 'effect';
import { expect } from 'vitest';

const ReservationProps = Schema.Struct({
  quantity: Schema.Number.check(Schema.isInt(), Schema.isGreaterThan(0)),
});
const makeReservation = Schema.decodeUnknownSync(ReservationProps);

const reserve = Effect.fn('reserve')(function* (
  props: { reservation: typeof ReservationProps.Type; available: number },
) {
  const { reservation, available } = props;
  const { quantity } = reservation;
  if (quantity > available) {
    return yield* Effect.fail('insufficient-stock');
  }
  return { reserved: quantity, remaining: available - quantity };
});

it.effect('reserves available stock', () =>
  Effect.gen(function* () {
    const props = makeReservation({ quantity: 2 });
    const result = yield* reserve({ reservation: props, available: 5 });
    expect(result).toEqual({ reserved: 2, remaining: 3 });
  }),
);

it.effect('refuses a quantity above available stock', () =>
  Effect.gen(function* () {
    const props = makeReservation({ quantity: 6 });
    const result = yield* Effect.exit(
      reserve({ reservation: props, available: 5 }),
    );
    expect(result).toEqual(Exit.fail('insufficient-stock'));
  }),
);
```

Do not pass a cast `{ quantity: 'two' }` reservation or cast `null` into its props.
The constructor or RPC admission owns that rejection. Nor does the inferred
`number` type prove positivity: the fixture deliberately uses the constructor.

## RPC handler: malformed props stop at admission

Adapted from `packages/system-worker/src/SystemApi/SystemApi.node.spec.ts` in
Zerospin. Reuse that suite's real `SystemApi` instance and reset
`appendTelemetryBatch` spy; retain its runtime disposal. Its existing Node mock
fixture tests handler admission, not Cloudflare platform semantics.

```ts
import { it } from '@effect/vitest';
import { decodeRpcOutcome } from '@zerospin/core/utils/decodeRpcOutcome';
import { Effect, Result } from 'effect';
import { expect } from 'vitest';

// Inside the existing SystemApi suite, with api and its downstream spy in scope.
it.effect('rejects malformed healthcheck arguments before telemetry', () =>
  Effect.gen(function* () {
    const envelope = yield* Effect.promise(() =>
      Reflect.apply(api.healthcheck, api, [
        { args: ['unexpected'], traceContext: null },
      ]),
    );
    const result = yield* decodeRpcOutcome(envelope.result).pipe(Effect.result);

    expect(Result.isFailure(result)).toBe(true);
    if (Result.isFailure(result)) {
      expect(result.failure.code).toBe('system-api-arguments-invalid');
    }
    expect(envelope.link).toBe(null);
    expect(appendTelemetryBatch).not.toHaveBeenCalled();
  }),
);
```

`Reflect.apply` deliberately crosses the typed call surface at the public
boundary. It is not a technique for fabricating invalid internal inputs. Keep
the companion valid request (`args: []`, `traceContext: null`) asserting the
decoded `healthy` response and expected telemetry. Directly testing
`Schema.decodeUnknownSync` would not catch a handler that bypasses admission.

## SDK: runtime construction and static restrictions

`makeSystemConfig` is exported by `@zerospin/sdk`. Its generic system argument
can accept `{}` statically, while its runtime schema requires a live system.
That makes this a constructor-owned invariant, not a consumer's malformed-input
test. It follows `packages/sdk/src/authoring.node.spec.ts`.

```ts
import { it } from '@effect/vitest';
import { makeSystemConfig } from '@zerospin/sdk';
import { Schema } from 'effect';
import { expect } from 'vitest';

it('requires a live system when constructing configuration', () => {
  expect(() => makeSystemConfig({}, { systemId: 'sys_test' })).toThrow(
    Schema.SchemaError,
  );
});
```

Keep the positive constructor case with the existing suite's real `makeSystem`
fixture: assert `config.system === system` and the accepted system ID, and dispose
the runtime in teardown. Do not reproduce these checks in every config consumer.

Put static misuse in the repository's compiler-checked lane. This example is
not a runtime test and must not be executed:

```ts
import { makeSystem, makeSystemConfig } from '@zerospin/sdk';

declare const system: ReturnType<typeof makeSystem>;

makeSystemConfig(system, { systemId: 'sys_test' });

// @ts-expect-error System IDs require the sys_ prefix.
makeSystemConfig(system, { systemId: 'invalid' });
```

Run the configured typecheck target so the negative assertion fails if that
restriction disappears. Do not use a cast to make it pass or count a transpiled
Vitest run as verification of the assertion.

## Further reading

- [Parse, don't validate — Alexis King](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/): preserve facts established at admission in the resulting types. The article uses Haskell; this skill applies the idea to Zerospin's runtime schemas and authored TypeScript APIs.
- [Vitest: Testing Types](https://vitest.dev/guide/testing-types): compile-time assertions and the separate typechecking workflow. Use the active repository's configured lane rather than assuming ordinary runtime tests check types.
- [fast-check: Arbitraries](https://fast-check.dev/docs/core-blocks/arbitraries/): generate inputs within a chosen domain. Property-based testing is optional when a meaningful invariant benefits from many examples; constrain internal generators to admitted props and test malformed values at admission.

The testing policy is a synthesis of these ideas and Zerospin conventions;
these sources do not prescribe this exact division of specs.
