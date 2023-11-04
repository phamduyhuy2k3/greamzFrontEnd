import "solana-wallets-vue/styles.css";
import SolanaWallets from "solana-wallets-vue";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {defineNuxtPlugin} from "#app";

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet}),

        new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    ],
    autoConnect: true,
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(SolanaWallets, walletOptions);
});