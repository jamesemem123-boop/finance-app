import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getFinanceNews } from "../services/api";

const MessagesScreen = () => {

  const navigation = useNavigation();

  const [articles, setArticles] = useState([]);

  const openNews = async (url) => {
  if (url) {
    await Linking.openURL(url);
  }
};

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getFinanceNews();
      setArticles(data);
    };
    fetchNews();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>News</Text>
      </View>

      // news card
      
     <FlatList
  data={articles}
  keyExtractor={(item, index) =>
    item.uuid ? item.uuid.toString() : index.toString()
  }
  renderItem={({ item }) => (
<TouchableOpacity
  style={styles.card}
  onPress={() => openNews(item.url)}
>      
      <Image
        source={{
          uri: item.image_url || "https://picsum.photos/200",
        }}
        style={styles.newsImage}
      />

      <View style={styles.content}>
        
        <View style={styles.topRow}>
          <Text style={styles.institution}>
            {item.source || "Unknown Source"}
          </Text>

          <Text style={styles.date}>
            {item.published_at
              ? new Date(item.published_at).toLocaleDateString()
              : "No Date"}
          </Text>
        </View>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {item.title || item.description || "No headline available"}
        </Text>

      </View>

    </TouchableOpacity>
  )}
  contentContainerStyle={{
    paddingBottom: 20,
  }}
/>
    </SafeAreaView>
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  institution: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default MessagesScreen;
