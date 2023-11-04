import { useWallet } from 'solana-wallets-vue';
import { Connection, clusterApiUrl, Keypair, SystemProgram, Transaction,LAMPORTS_PER_SOL } from '@solana/web3.js';

const MY_PUBLIC_KEY="4YnBJVkThFnwhitZgJ9rY5eKM2yC74AwnS9Ewf1nWUGR"
export const sendOneLamportToRandomAddress =async (vnd) => {
    const connection = new Connection(clusterApiUrl('devnet'))
    const { publicKey, sendTransaction } = useWallet();
    if (!publicKey.value) return;
    const sol=Number((vnd /1416494).toFixed(6))
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: publicKey.value,
            toPubkey: MY_PUBLIC_KEY,
            lamports: sol * LAMPORTS_PER_SOL,
        })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'processed');
};