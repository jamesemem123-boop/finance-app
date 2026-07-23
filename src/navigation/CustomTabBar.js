import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const onPress = () => navigation.navigate(route.name);

        
                const icons = { Home: "home", Search: "search", News: "mail", Settings: "settings" };
                const iconName = isFocused ? icons[route.name] : `${icons[route.name]}-outline`;

                return (
                    <TouchableOpacity key={index} onPress={onPress} style={styles.tabButton}>
                        {isFocused ? (
                            <LinearGradient
                                colors={['#4c669f', '#2563EB']} 
                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                                style={styles.pill}
                            >
                                <Ionicons name={iconName} size={20} color="#fff" />
                                <Text style={styles.pillText}>{route.name}</Text>
                            </LinearGradient>
                        ) : (
                            <Ionicons name={iconName} size={24} color="#787c79" />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({

    tabContainer: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },

    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20
    },

    pillText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 13
    }
});

export default CustomTabBar;