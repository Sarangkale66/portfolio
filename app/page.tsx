import LoadComponent from "@/components/LoadComponent"
import HomePage from "@/pages/HomePage";

export default async function Home() {
  return (
    <LoadComponent>
      <HomePage/>
    </LoadComponent>
  );
}
