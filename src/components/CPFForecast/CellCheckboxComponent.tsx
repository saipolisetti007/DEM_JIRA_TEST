// CellCheckboxComponent is a custom cell component for the checkbox column in the CPFForecast table.
import React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { SkuForecastType } from './SkuItem';

type CellRowType = {
  id: string;
  index: number;
  original: SkuForecastType;
};

type CellCheckboxComponentProps = {
  row: CellRowType;
  rowSelection: Record<number, boolean>;
  handleCheckboxChange: Function;
  setRowSelection: Function;
  prevUnits: number | null;
  cpfEnabled: boolean;
};
const CustomWidthTooltip = styled(
  ({ className, ...props }: { className?: string } & TooltipProps) => {
    return <Tooltip {...props} classes={{ popper: className }} />;
  }
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 150
  }
}));

const CellCheckboxComponent = ({
  row, // row object from the table
  rowSelection, // rowSelection object from the table
  handleCheckboxChange, // handleCheckboxChange function from the table
  setRowSelection, // setRowSelection function from the table
  prevUnits, // prevUnits value from the table
  cpfEnabled // cpfEnabled value from the table
}: CellCheckboxComponentProps) => {
  const isPrevUnitsNull = prevUnits !== null;
  // disabling pointer events if prevUnits is null
  const checkboxStyle: React.CSSProperties = {
    pointerEvents: isPrevUnitsNull && cpfEnabled ? 'auto' : 'none',
    opacity: isPrevUnitsNull ? 1 : 0.5
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Display checkbox only if the row is active */}
      {row.original.active && (
        <>
          <CustomWidthTooltip
            placement="top-start"
            arrow
            title={!isPrevUnitsNull ? 'Cannot be unchecked, as no previous forecast exists' : ''}>
            <span>
              <Checkbox
                style={checkboxStyle}
                sx={{ padding: 0 }}
                checked={prevUnits === null ? true : rowSelection[row.id] || false}
                onChange={(event) => handleCheckboxChange(event, row, setRowSelection)}
              />
            </span>
          </CustomWidthTooltip>
          {/* Display warning icon if the forecast is incorrect */}
          {row.original.forecastIncorrect && <WarningAmberIcon color="warning" fontSize="small" />}
          {/* Display error icon if the forecast is missing */}
          {row.original.forecastMissing && <ErrorIcon color="error" fontSize="small" />}
        </>
      )}
    </div>
  );
};

export default CellCheckboxComponent;
