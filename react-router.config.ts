import type { Config } from "@react-router/dev/config";
import { getLogList } from "./app/lib/logRegistry";

export default {
  ssr: false,
  async prerender() {
    const logs = getLogList();
    const logPaths = logs.map(log => `/log/${log.slug}`);
    return ["/", ...logPaths];
  }
} satisfies Config;
