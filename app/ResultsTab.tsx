import AllResultsPage from '@/components/AllResultsPage';
import React from "react";
import { View , Text} from 'react-native';

import { useHistories } from "@/context/HistoriesProvider";
import AppPageWrapper from '@/components/AppPageWrapper';

const ResultsTab = () => {
    const { allHistories } = useHistories();
    return (
        <AppPageWrapper>
            <View style={{ justifyContent: 'center' ,flex: 1, alignItems: 'center', width: '100%' }}>
                <AllResultsPage allHistories={allHistories} /> 
            </View>
        </AppPageWrapper>
    );
}

export default ResultsTab;