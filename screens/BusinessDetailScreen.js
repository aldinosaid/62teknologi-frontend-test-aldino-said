import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Image,
    Button,
    Platform,
    Linking
} from "react-native";
import React, {useState, useEffect} from "react";
import ReviewLists from '../components/BusinessDetails/ReviewLists';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function BusinessDetailScreen({ route }) {
    const { id } = route.params;

    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState();
    let [response, setResponse] = useState();

    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx'
        }
    };

    const getBusinessDetail = () => {
        fetch('https://api.yelp.com/v3/businesses/'+id, options).then((res) => res.json())
        .then(
            (result) => {
                setResponse(result);
                setIsLoading(false);
            },
                (error) => {
                    setError(error);
                    setIsLoading(false);
            }
        )
        .catch((error) => {
            console.error(error)
        })
    }

    const getReviews = () => {
        fetch('https://api.yelp.com/v3/businesses/'+id, options).then((res) => res.json())
        .then(
            (result) => {
                setResponse(result);
                setIsLoading(false);
            },
                (error) => {
                    setError(error);
                    setIsLoading(false);
            }
        )
        .catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        getBusinessDetail();
    }, []);

    const getContent = () => {
        if (isLoading) {
          return <ActivityIndicator size="large"/>
        }
    
        if (error) {
          return <Text>{error}</Text>
        }

        let imageUrl = [
            {
                image_url : response.photos[0]
            },
            {
                image_url : response.photos[1]
            },
            {
                image_url : response.photos[2]
            }
        ];
    
        
        return <View style={{
            marginTop: 20,
            flex: 1
        }}>
                <FlatList
                    data={imageUrl}
                    style={{ paddingLeft: 20}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                    <Image source={{uri: item.image_url}} style={{
                        borderRadius: 15,
                        marginRight: 20,
                        marginBottom: 40
                    }} height={200} width={340}/>
                )}/>
                <View style={{
                    margin: 20,
                    backgroundColor: '#EEEDEB',
                    alignContent: 'center',
                    borderRadius: 15,
                    padding: 10,
                    paddingBottom: 20
                }}>
                    <Text style={{
                        alignSelf: "center",
                        fontSize: 20
                    }}>{response.name}</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap:50,
                        justifyContent: "center",
                        marginTop: 20
                    }}>
                        <View>
                            <Text>Rating</Text>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 6
                            }}>
                                <Icon style={{fontSize:16}} name="star" color={'#FFDB00'}/>
                                <Text style={{fontSize:16}}>
                                    {response.rating}
                                </Text>
                            </View>
                        </View>
                        <Button title="See on Google Maps" onPress={() => {
                            const latitude = response.coordinates.latitude;
                            const longitude = response.coordinates.longitude;
                            const label = response.location.display_address;

                            const url = Platform.select({
                                ios: "maps:" + latitude + "," + longitude + "?q=" + label,
                                android: "geo:" + latitude + "," + longitude + "?q=" + label
                            });
                            Linking.openURL(url);
                        }}/>
                </View>
            </View>
            {/* Component Review lists */}
            <ReviewLists id={response.id}/>
        </View>;
    }

    return getContent();
}