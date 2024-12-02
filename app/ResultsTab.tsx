import AllResultsPage from '@/components/AllResultsPage';
import React from "react";
import { useHistories } from "@/context/HistoriesProvider";
import AppPageWrapper from '@/components/AppPageWrapper';

const ResultsTab = () => {
    const { allHistories } = useHistories();
    return (
        <AppPageWrapper>
            <AllResultsPage allHistories={allHistories} /> 
        </AppPageWrapper>
    );
}

export default ResultsTab;