import { loadAsync, useFonts } from 'expo-font';
import { useEffect, useState } from 'react';

export const useFont = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
    }, [])

    async function loadFonts() {
        try {
            await loadAsync({
                'AvenirNextLTPro-Bold': require('../../assets/fonts/AvenirNextLTPro-Bold.otf'),
                'AvenirNextLTPro-MediumCn': require('../../assets/fonts/AvenirNextLTPro-MediumCn.otf'),
                'AvenirNextLTPro-MediumCnIt': require('../../assets/fonts/AvenirNextLTPro-MediumCnIt.otf'),
                'AvenirNextLTPro-MediumIt': require('../../assets/fonts/AvenirNextLTPro-MediumIt.otf'),
                'AvenirNextLTPro-Regular': require('../../assets/fonts/AvenirNextLTPro-Regular.otf'),
                'DiplomataSC-Regular': require('../../assets/fonts/DiplomataSC-Regular.ttf'),
                'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
                'Lato-Light': require('../../assets/fonts/Lato-Light.ttf'),
                'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
                'SourceSansPro-Bold': require('../../assets/fonts/SourceSansPro-Bold.ttf'),
                'SourceSansPro-Regular': require('../../assets/fonts/SourceSansPro-Regular.ttf'),
                'SourceSansPro-SemiBold': require('../../assets/fonts/SourceSansPro-SemiBold.ttf'),
            });
            setLoaded(true)
        } catch (error) {
            console.log(error)
            setLoaded(false)
        }
    }

    return {
        loaded
    }
}