import { toast } from "sonner";

export default function MyToast() {
  return <button onClick={() => toast.error("Toast")}>Render Toast</button>;
}
