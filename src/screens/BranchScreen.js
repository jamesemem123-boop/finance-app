import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";


const branches = [
  {
    id: "1",
    name: "Head Office, Marina",
    distance: "650 m",
    latitude: 6.4541,
    longitude: 3.3947,
  },
  {
    id: "2",
    name: "Victoria Island Branch",
    distance: "2.4 km",
    latitude: 6.4281,
    longitude: 3.4219,
  },
  {
    id: "3",
    name: "Lekki Phase 1 Branch",
    distance: "6.8 km",
    latitude: 6.4381,
    longitude: 3.4686,
  },
  {
    id: "4",
    name: "Bariga Branch",
    distance: "3.5 km",
    latitude: 6.5356,
    longitude: 3.3899,
  },
  {
    id: "5",
    name: "Surulere Branch",
    distance: "5.2 km",
    latitude: 6.5016,
    longitude: 3.3581,
  },
  {
    id: "6",
    name: "Yaba Branch",
    distance: "4.1 km",
    latitude: 6.5095,
    longitude: 3.3711,
  },
  {
    id: "7",
    name: "Shomolu Branch",
    distance: "4.8 km",
    latitude: 6.5384,
    longitude: 3.3679,
  },
  {
    id: "8",
    name: "Costain Branch",
    distance: "3.1 km",
    latitude: 6.4878,
    longitude: 3.3648,
  },
  {
    id: "9",
    name: "Ikeja Branch",
    distance: "11.7 km",
    latitude: 6.6018,
    longitude: 3.3515,
  },
];


const BranchScreen = () => {

  const navigation = useNavigation();

  const mapRef = React.useRef(null);

  const [search, setSearch] = useState("");

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const [region, setRegion] = useState({
    latitude: branches[0].latitude,
    longitude: branches[0].longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const [searchedLocation, setSearchedLocation] = useState(null);


  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );


  const searchLocation = async () => {
    if (!search.trim()) return;

    setSearchedLocation(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          search
        )}&format=json&limit=1`,
        {
          headers: {
            "User-Agent": "FinanceApp",
          },
        }
      );

      const data = await response.json();

      console.log("SEARCH RESULT:", data);


      if (data.length > 0) {

        const place = data[0];


        const newRegion = {
          latitude: parseFloat(place.lat),
          longitude: parseFloat(place.lon),
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        };


        // update marker position
        setRegion(newRegion);


        // move map camera
        mapRef.current?.animateToRegion(
          newRegion,
          1000
        );


        setSearchedLocation({
          name: place.display_name,
          latitude: place.lat,
          longitude: place.lon,
        });


        console.log("SAVED LOCATION:", {
          name: place.display_name,
          latitude: place.lat,
          longitude: place.lon,
        });


      } else {

        console.log("Location not found");

      }


    } catch (error) {

      console.log(error);

    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color="#000"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          Branch
        </Text>
      </View>


      <View style={styles.mapContainer}>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: branches[0].latitude,
            longitude: branches[0].longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >

          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Selected Location"
            pinColor="red"
          />

        </MapView>


        <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => {
            if (!searchedLocation) {
              console.log("No location selected");
              return;
            }

            const url = `https://www.google.com/maps/search/?api=1&query=${searchedLocation.latitude},${searchedLocation.longitude}`;
            Linking.openURL(url);
          }}
        >
          <Text style={styles.navigateText}>
            Navigate
          </Text>
        </TouchableOpacity>
      </View>



      <View style={styles.searchContainer}>

        {searchedLocation && (
          <View style={styles.resultCard}>
            <Ionicons
              name="location"
              size={22}
              color="#D32F2F"
            />

            <Text style={styles.resultText}>
              {searchedLocation.name}
            </Text>
          </View>
        )}

        <View style={styles.searchBox}>

          <Ionicons
            name="search"
            size={22}
            color="#8E8E93"
          />

          <TextInput
            placeholder="Search location..."
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              setSearchedLocation(null);
            }}
            onSubmitEditing={searchLocation}
            style={styles.searchInput}
          />


          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
            >
              <Ionicons
                name="close-circle"
                size={22}
                color="#8E8E93"
              />
            </TouchableOpacity>
          )}

        </View>



        <FlatList

          data={filteredBranches}

          keyExtractor={(item) => item.id}

          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (

            <TouchableOpacity

              style={styles.branchCard}

              onPress={() => {

                setSelectedBranch(item);

                setRegion({
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                });

              }}

            >

              <View style={styles.branchLeft}>

                <Ionicons
                  name="location"
                  size={22}
                  color="#1D4ED8"
                />


                <Text style={styles.branchName}>
                  {item.name}
                </Text>

              </View>



              <Text style={styles.branchDistance}>
                {item.distance}
              </Text>


            </TouchableOpacity>

          )}

        />


      </View>


    </SafeAreaView >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
  },

  mapContainer: {
    marginHorizontal: 25,
    marginTop: 20,
    height: 300,
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: "#FFF",

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  map: {
    flex: 1,
  },

  customMarker: {
    alignItems: "center",
    justifyContent: "center",
  },

  navigateButton: {
    position: "absolute",

    bottom: 15,
    right: 15,

    backgroundColor: "#1D4ED8",

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 20,
  },

  navigateText: {
    color: "#FFF",
    fontWeight: "600",
  },

  searchContainer: {
    marginHorizontal: 25,
    marginTop: 20,

    height: 350,

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 18,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F5F5F5",

    borderRadius: 14,

    paddingHorizontal: 14,

    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },

  branchCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  branchLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  branchName: {
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
    flex: 1,
  },

  branchDistance: {
    fontSize: 14,
    color: "#8E8E93",
  },

  resultCard: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 15,

    padding: 15,

    backgroundColor: "#F8F8F8",

    borderRadius: 12,
  },

  resultText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
})

export default BranchScreen