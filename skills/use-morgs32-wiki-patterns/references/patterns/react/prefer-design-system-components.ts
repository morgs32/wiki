import { createElement, type ReactNode } from 'react';

declare const Button: (props: {
  type?: 'button';
  variant?: 'default' | 'outline' | 'ghost';
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}) => ReactNode;

// Represents the application's router Link; use its actual destination prop.
declare const Link: (props: { href: string; children?: ReactNode }) => ReactNode;

/**
 * Default to the existing design-system component for standard interactive controls.
 *
 * @bad Do not hand-style a native `<button>` when the repository already provides a shadcn Button.
 * @bad Do not recreate design-system variants with one-off utility classes at the call site.
 */
export const viewDataButton = Button({
  type: 'button',
  children: 'View data',
});

/**
 * Style sidebar navigation with Button asChild and a single router Link child.
 * Keep icons left of text with flex gap; pass href or to as the router requires.
 *
 * @bad Do not replace a real navigation link with an imperative button handler.
 * @bad Do not use a raw anchor or unstyled Link when the sidebar uses Button styling.
 */
export const sidebarLink = createElement(
  Button,
  { asChild: true, variant: 'ghost', className: 'w-full justify-start gap-2' },
  createElement(
    Link,
    { href: '/account' },
    createElement('span', { 'aria-hidden': true, className: 'size-4 shrink-0' }, '→'),
    createElement('span', null, 'Account'),
  ),
);
