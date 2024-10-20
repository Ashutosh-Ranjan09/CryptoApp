import TokenWatchList from "./TokenWatchList";
import WalletCard from "./WalletCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-10">
      <h1 className="text-xl text-center pb-10 font-bold">Crypto App</h1>
      <WalletCard />
      <TokenWatchList />
    </div>
  );
}
