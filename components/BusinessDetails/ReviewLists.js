import { View, Text, Image, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper';


export default function ReviewLists({id}) {
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

    const getReviews = () => {
        fetch("https://api.yelp.com/v3/businesses/"+id+"/reviews?limit=20&sort_by=yelp_sort", options).then((res) => res.json())
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
        getReviews();
    }, []);

    const renderItems = ({item}) => {
        return (
            <View style={{
                backgroundColor: '#E1F7F5',
                margin: 10,
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{
                    display:'flex',
                    flexDirection: 'row',
                    gap: 120
                }}>
                    <View style={{
                        display:'flex',
                        flexDirection: 'row',
                        gap: 15,
                        marginLeft: 10
                    }}>
                        <Image source={{uri : item.user.image_url}} width={40} height={40} style={{
                            borderRadius: 50
                        }}/>
                        <Text>{item.user.name}</Text>
                    </View>
                    <Text>Rating: {item.rating}</Text>
                </View>
                <View style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5
                }}>
                    <Text numberOfLines={2}>
                        {item.text}
                    </Text>
                </View>
            </View>
        )
    }

    const getContent = () => {
        if (isLoading) {
          return <ActivityIndicator size="small"/>
        }
    
        if (error) {
          return <Text>{error}</Text>
        }

        if (!isLoading) {
            return <FlatList data={response.reviews} renderItem={renderItems}/>;
        }
    }

  return (getContent());
}