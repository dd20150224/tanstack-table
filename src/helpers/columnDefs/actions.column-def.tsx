import {
  HiQuestionMarkCircle,
  HiPrinter,
  HiXMark,
  HiPencilSquare
} from "react-icons/hi2";

import { ColumnDef } from '@tanstack/react-table'
import { IAction, IKeyValue } from '~/config/types';
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const actionsColumnDef = (actions: IAction[]): ColumnDef<IKeyValue> => {
  return {
    id: 'actions',
    header: () => 'Actions',
    enablePinning: true,
    cell: () => {
    // cell: ({ row, table }) => {
      const onClickHandler = (action: IAction) => {
        console.log('action: ' + (action ? 'yes' : 'no'));
        alert('onClickHandler');
      }
      return (
        <div className="px-1 text-left flex flex-row gap-[2px] items-center bg-white h-full">
          {actions.map( (action,index) => {
            let actionIcon: React.ReactNode = <HiQuestionMarkCircle />;
            let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
            if (action.variant) {
              variant = action.variant;
            }
            switch (action.icon) {
              case 'edit':
                actionIcon = <HiPencilSquare />;
                break;
              case 'delete':
                actionIcon = <HiXMark />;
                break;
              case 'print':
                actionIcon = <HiPrinter />;
                break;
            }
            const buttonClasses = cn(
              'w-6 h-6 rounded-full p-[1px] text-white min-w-0 h',
              (variant==='default') &&
                'bg-primary hover:bg-primary-700/80 text-primary-foreground',
              (variant === 'destructive') &&
                'bg-destructive hover:bg-destructive/80 text-destructive-foreground',
              (variant === 'secondary') &&
                'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
              (variant === 'ghost') &&
                'bg-muted hover:bg-muted/80 text-muted-foreground',
            );
            return (
              <Button key={index}
                variant={variant}
                className={buttonClasses}
                size="icon"
                onClick={()=>onClickHandler(action)}>
                  {actionIcon}
              </Button>
            )
          })}
        </div>
      )
    },
  }
}
