import { createThirdwebClient } from "thirdweb";
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "369e961919816668748384f67c13ede3";

export const client = createThirdwebClient({
    clientId: clientId,
});
