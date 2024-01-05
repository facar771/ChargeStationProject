
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const submitName = () => {

  axios.get('http://45.141.151.31:5000/api/chargestation/getstationall')
      .then(response => {
        const data = response.data;
        const id = data.map(item => item.id);
        const locations = data.map(item => item.location);
        navigation.navigate('Map', { locations: locations, id: id });
        console.log('İstek başarılı:', locations);
      })
      .catch(error => {
        console.log('İstek hatası:', error);
      });
};

useEffect(() => {
  submitName();
}, []);

export { submitName };