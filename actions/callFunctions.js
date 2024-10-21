import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const callPolice = () => {
    NetInfo.addEventListener((state) => {
        if (state.isConnected) {
            Geolocation.getCurrentPosition(info => {
                axios.post('', info).then(({ data }) => {
                    let webRTCCode = data.code;
                });
            });
        }
    }
    );
};

const callAmbulance = () => {
    NetInfo.addEventListener((state) => {
        if (state.isConnected) {
            Geolocation.getCurrentPosition(info => {
                axios.post('', info).then(({ data }) => {
                    let webRTCCode = data.code;
                });
            });
        }
    }
    );
};
const callFireBregade = () => {
    NetInfo.addEventListener((state) => {
        if (state.isConnected) {
            Geolocation.getCurrentPosition(info => {
                axios.post('', info).then(({ data }) => {
                    let webRTCCode = data.code;
                });
            });
        }
    }
    );
};

export {callPolice, callAmbulance, callFireBregade};
