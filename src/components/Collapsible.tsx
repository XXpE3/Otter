import { Button } from '@/src/components/Button';
import { CaretUpDown } from '@phosphor-icons/react';
import {
  CollapsibleContentProps,
  CollapsibleProps,
  Collapsible as CollapsibleRoot,
  CollapsibleTriggerProps,
  CollapsibleContent as Content,
  CollapsibleTrigger as Trigger,
} from '@radix-ui/react-collapsible';
import { forwardRef, useCallback } from 'react';

import { Flex } from './Flex';
import { useUser } from './UserProvider';

interface CollapsibleProps1 extends CollapsibleProps {
  stateKey: 'tags' | 'types' | 'collections';
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps1>(
  ({ children, stateKey, ...props }, ref) => {
    const { profile, handleUpdateUISettings } = useUser();
    const handleOpenChange = useCallback(
      (open: boolean) => {
        handleUpdateUISettings({
          type: `settings_${stateKey}_visible`,
          payload: open,
        });
      },
      [handleUpdateUISettings, stateKey],
    );

    const settingKey = `settings_${stateKey}_visible` as const;
    const isVisible = profile ? profile[settingKey] as boolean : false;

    return (
      <CollapsibleRoot
        ref={ref}
        onOpenChange={handleOpenChange}
        open={isVisible}
        {...props}
      >
        {children}
      </CollapsibleRoot>
    );
  },
);

Collapsible.displayName = 'Collapsible';

export const CollapsibleContent = (props: CollapsibleContentProps) => (
  <Content {...props} className="overflow-hidden pt-3xs" />
);

export const CollapsibleTrigger = ({
  children,
  ...rest
}: CollapsibleTriggerProps) => {
  return (
    <Trigger asChild {...rest}>
      <Button
        variant="collapsible"
        size="s"
        className="h-7 w-full justify-start !gap-2xs"
      >
        <div className="rounded-m bg-theme3 p-1">
          <CaretUpDown weight="duotone" size={14} />
        </div>
        <Flex justify="between" align="center" className="grow text-step--2">
          {children}
        </Flex>
      </Button>
    </Trigger>
  );
};
