import { useWallet } from 'solana-wallets-vue';
import {
    Connection,
    clusterApiUrl,
    Keypair,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    type TransactionConfirmationStrategy,
    TransactionMessage,
    type TransactionSignature,
    type BlockheightBasedTransactionConfirmationStrategy,
    type BaseTransactionConfirmationStrategy,

    VersionedTransaction,
    PublicKey,
} from '@solana/web3.js';

const MY_PUBLIC_KEY= new PublicKey("4YnBJVkThFnwhitZgJ9rY5eKM2yC74AwnS9Ewf1nWUGR")
export const sendOneLamportToRandomAddress =async (vnd: number) => {

    const { publicKey, sendTransaction } = useWallet();
    if (!publicKey.value) return;
    const {data}:any=await useFetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=vnd")
    if(data.value){
        const sol=Number((vnd /data.value?.solana?.vnd).toFixed(6))
        const sender=publicKey.value
        const ix = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: MY_PUBLIC_KEY ,
                lamports: sol * LAMPORTS_PER_SOL,
            })
        );
        const merchant = Keypair.fromSecretKey(
            new Uint8Array(
                JSON.parse(
                    "[150,172,56,80,106,87,147,72,14,71,81,190,189,234,124,67,35,18,231,40,189,156,117,152,5,28,106,133,51,162,233,238,16,243,120,122,208,249,237,216,29,83,9,66,49,173,213,148,87,98,24,217,141,134,178,27,162,205,60,171,31,128,98,59]"
                )
            )
        );
        const abort = new AbortController();
        let transaction = new Transaction();
        transaction.add(ix);
        const connection = new Connection(clusterApiUrl('devnet'))
        const bh = await connection.getLatestBlockhash();
        transaction.recentBlockhash = bh.blockhash;
        transaction.feePayer = merchant.publicKey;
        const signature = await sendTransaction(transaction, connection);

        const strategy: BaseTransactionConfirmationStrategy = {
            abortSignal: abort.signal,
            signature: signature,
        } as BaseTransactionConfirmationStrategy
        await connection.confirmTransaction( strategy as TransactionConfirmationStrategy,'processed');
    }else {
        throw new Error("Can't get price")
    }


};