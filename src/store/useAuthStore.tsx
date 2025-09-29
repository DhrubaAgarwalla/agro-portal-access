import { create } from "zustand";
import toast from "react-hot-toast";
import { ethers } from "ethers";
//import { contractAddress, contractAbi } from "@/config/connectionKeys";

// Define the Ethereum window object
declare global {
    interface Window {
        ethereum?: any;
    }
}

// Define the store state interface
interface AuthStore {
    authUser: boolean;
    isLoggingIn: boolean;
    connectedAddress: string | null;
    contractInstance: ethers.Contract | null;
    connectWallet: () => Promise<null | void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    authUser: false,
    isLoggingIn: false,
    connectedAddress: null,
    contractInstance: null,

    connectWallet: async (): Promise<null | void> => {
        if (!window.ethereum) {
            toast.error("Please install MetaMask!");
            return null;
        }

        set({ isLoggingIn: true });

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            set({ authUser: true });

            const account: string = await signer.getAddress();
            set({ connectedAddress: account });

           // const contract = new ethers.Contract(contractAddress, contractAbi, signer);
           // set({ contractInstance: contract });

            console.log("Connected account:", account);
            toast.success("Wallet connected successfully");

        } catch (error) {
            console.error("Error connecting wallet:", error);
            toast.error("Error connecting wallet");
        } finally {
            set({ isLoggingIn: false });
        }
    }
}));