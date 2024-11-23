import app from "./app";
import { PORT } from "./configs/env";


app.listen(PORT || 5000, () => {
  console.log(`Server running on http://localhost:${PORT || 5000}`);
});
