import React, { useState } from 'react';
import PageSection from '../Common/PageSection';
import BreadcrumbNavigation from '../Common/BreadcrumbNavigation';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ValidationPageDialog from '../Common/ValidationPageDialog';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ManualDaSteps from './ManualDaSteps';
const ManualDaValidations = () => {
  const navigate = useNavigate();
  // State for the dialog
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [navigateTarget, setNavigateTarget] = useState<string | null>(null);
  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/manual-da');
  };
  // Handle dialog confirm
  const handleDialogConfirm = () => {
    setDialogOpen(false);
    if (navigateTarget) {
      navigate(navigateTarget);
    }
  };
  // Handle navigation
  const handleNavigate = (target: string) => {
    setNavigateTarget(target);
    setDialogOpen(true);
  };

  return (
    <>
      <PageSection>
        <Box className="flex items-center justify-between">
          <div>
            <BreadcrumbNavigation
              previousPage="Manual DA "
              previousLink="/manual-da"
              currentPage="Manual DA Validation Page"
              onNavigate={handleNavigate}
            />
            <DefaultPageHeader title="Manual DA Validations" />
          </div>
          <Button
            variant="outlined"
            color="info"
            className="rounded-full ml-4"
            startIcon={<SimCardDownloadIcon />}>
            Export to Excel
          </Button>
        </Box>
        <ManualDaSteps />
      </PageSection>

      <ValidationPageDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        onReturnToCurrentPage={handleDialogClose}
        currentPage="Manual DA Validation"
      />
    </>
  );
};

export default ManualDaValidations;
