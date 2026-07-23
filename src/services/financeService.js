import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

// Fallback mock data used whenever Firestore returns 0 items or loses network

export const fetchTransferContacts = async () => {
    return [
        {
        id: "1",
        name: "Jane Cooper",
        cardNumber: "3246 •••• •••• 3422",
        avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        },
    ];
    };

    const FALLBACK_TRANSACTIONS = [
    {
        id: "1",
        title: "Water Bill",
        status: "Successfully",
        amount: "- $280.00",
        isExpense: true,
        icon: "water-outline",
        iconBg: "#5B72FF",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Salary Income",
        status: "Successfully",
        amount: "+ $3,500.00",
        isExpense: false,
        icon: "wallet-outline",
        iconBg: "#2EC4B6",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
    {
        id: "3",
        title: "Grocery Store",
        status: "Successfully",
        amount: "- $120.50",
        isExpense: true,
        icon: "cart-outline",
        iconBg: "#FFB703",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    },
    ];

    export const fetchContacts = async () => {
    try {
        const currentUser = auth?.currentUser;

        if (!currentUser || !db) {
        return FALLBACK_CONTACTS;
        }

        const q = query(
        collection(db, "contacts"),
        where("userId", "==", currentUser.uid),
        );
        const querySnapshot = await getDocs(q);
        const contacts = [];

        querySnapshot.forEach((docSnap) => {
        contacts.push({ id: docSnap.id, ...docSnap.data() });
        });

        return contacts.length > 0 ? contacts : FALLBACK_CONTACTS;
    } catch (error) {
        console.error("Error fetching contacts, using fallback:", error);
        return FALLBACK_CONTACTS;
    }
    };

    /**
     * Fetch dynamic transaction report
     */
    export const fetchTransactionReport = async () => {
    try {
        const currentUser = auth?.currentUser;

        // If user is not logged in or Firebase isn't ready, use sample UI data
        if (!currentUser) {
        console.log("No user logged in. Serving fallback UI transactions.");
        return FALLBACK_TRANSACTIONS;
        }

        const q = query(
        collection(db, "transactions"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const transactions = [];

        querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        // Normalize Firestore Timestamp or JS Date to ISO string
        let createdAtIso = new Date().toISOString();
        if (data.createdAt && typeof data.createdAt.toDate === "function") {
            createdAtIso = data.createdAt.toDate().toISOString();
        } else if (data.createdAt) {
            createdAtIso = data.createdAt;
        }

        transactions.push({
            id: docSnap.id,
            ...data,
            createdAt: createdAtIso,
        });
        });

        // If Firestore collection has items, return them; otherwise render sample data
        return transactions.length > 0 ? transactions : FALLBACK_TRANSACTIONS;
    } catch (error) {
        console.error(
        "Error in fetchTransactionReport, defaulting to fallback data:",
        error,
        );
        return FALLBACK_TRANSACTIONS;
    }
    };

    /**
     * Fetch dynamic user profile details
     */
    export const fetchUserProfile = async () => {
    try {
        const currentUser = auth?.currentUser;
        if (!currentUser) {
        return { displayName: "Guest User", email: "" };
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
        return userSnap.data();
        } else {
        return {
            displayName: currentUser.displayName || "User",
            email: currentUser.email,
        };
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { displayName: "User", email: "" };
    }
};
