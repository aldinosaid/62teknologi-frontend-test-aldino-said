import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Image,
    Button,
    TextInput,
    Modal
} from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function BusinessScreen() {
  const navigation = useNavigation();
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  let [location, setLocation] = useState('NYC');
  let [offset, setOffset] = useState(1);
  let [visible, setVisible] = useState(false);
  let [filter, setFilter] = useState('best_match');
  let limit = 20;
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx'
    }
  };

  const loadMore = () => {
    searchBusinessData();
    setOffset(offset+1);
  }

  const searchHandle = (text) => {
    if (text) {
      setLocation(text)
      setOffset(1);
      searchBusinessData();
    }
  }

  const filterHandle = (filterValue) => {
    if (filterValue) {
      setFilter(filterValue);
      setVisible(false);
      searchBusinessData();
    }
  }

  searchBusinessData = () => {
    fetch('https://api.yelp.com/v3/businesses/search?location='+location+'&sort_by='+filter+'&limit='+limit+'&offset='+offset, options).then((res) => res.json())
    .then(
      (result) => {
        setResponse(result.businesses);
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
    searchBusinessData()
  }, []);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large"/>
    }

    if (error) {
      return <Text>{error}</Text>
    }

    if (response) {
      return <FlatList
        data={response}
        // onEndReached={fetchMore}
        ListFooterComponent={() => (
          <Text style={{
            alignSelf: 'center',
            padding: 20,
            color: 'blue'
          }} onPress={loadMore}>Next Page</Text>
        )}
        renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            backgroundColor: "#E3E1D9",
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            borderRadius: 15,
            padding: 20,
            marginTop: 20
        }}>
            <View style={{
                alignSelf: "center"
            }}>
                <Image source={{uri: item.image_url ?? 'https://www.dummyimage.co.uk/600x400/cbcbcb/959595/Dummy Image/40'}} style={{ borderRadius: 15 }} height={200} width={325}/>
            </View>
            <View>
                <Text style={{
                    fontSize: 18,
                    alignSelf: "center"
                }}>{item.name}</Text>
                <Text>{item.location.display_address}</Text>
                <Text>{item.review_count} reviews</Text>
                <Button style={{
                    borderRadius: 15
                }} title="Details" onPress={() => navigation.navigate("BusinessDetail", {
                    id: item.id
                })}/>
            </View>
        </View>
      )}/>;
    }
  }

  const searchBar = () => {
    return <View style={{margin: 5}}>
      <View style={{
        flexDirection: 'row',
        gap: 20
      }}>
        <TextInput style={styles.Text} onChangeText={(text) => searchHandle(text)} placeholder="Search by location"/>
        <Icon
          onPress={() => {
            setVisible(true);
          }}
          style={{
          fontSize:24,
          marginTop: 12
        }} name="sliders-h"/>
      </View>
      <View style={{
        flexDirection: 'row',
        gap: 120
      }}>
        <Text>Result for : {location}</Text>
        <Text>Filter by: {filter}</Text>
      </View>
    </View>;
  }

  const modal = () => {
    return <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => {
      setVisible(!visible);
    }}>
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
      }}>
        <View style={{
          width: '80%',
          height: 200,
          borderRadius: 10,
          backgroundColor: '#fff'
        }}>
        <View style={{
          width: '100%',
          height: 50,
          borderBottomWidth: 0.5,
          justifyContent: 'center',
          paddingLeft: 20,
          color: 'blue'
        }}>
          <Text onPress={() => {
            filterHandle('best_match');
          }}>Best Match</Text>
        </View>
        <View style={{
          width: '100%',
          height: 50,
          borderBottomWidth: 0.5,
          justifyContent: 'center',
          paddingLeft: 20,
          color: 'blue'
        }}>
          <Text onPress={() => {
            filterHandle('rating');
          }}>Rating</Text>
        </View>
        <View style={{
          width: '100%',
          height: 50,
          borderBottomWidth: 0.5,
          justifyContent: 'center',
          paddingLeft: 20,
          color: 'blue'
        }}>
          <Text onPress={() => {
            filterHandle('review_count');
          }}>Review count</Text>
        </View>
        <View style={{
          width: '100%',
          height: 50,
          borderBottomWidth: 0.5,
          justifyContent: 'center',
          paddingLeft: 20,
          color: 'blue'
        }}>
          <Text onPress={() => {
            filterHandle('distance');
          }}>Distance</Text>
        </View>
        </View>
      </View>
    </Modal>
  }

  return (
    <View style={{
      marginBottom: 170,
      margin : 10
    }}>
      {searchBar()}
      <View style={styles.container}>
        {getContent()}
      </View>
      {modal()}
    </View>
  );
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    Text: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      color: "#000",
      borderWidth: 1,
      width: 310,
    }
});