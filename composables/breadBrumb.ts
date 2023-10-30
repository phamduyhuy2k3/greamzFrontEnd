import type {Ref} from "@vue/reactivity";


export const userBreadCrumb = () => {
  const route = useRoute();
  const routes = useRouter().getRoutes();
  const HOMEPAGE = { name: "Home", path: "/" };
  const breadcrumbs: Ref<Array<{ name: string; path: string }>> = ref([
    HOMEPAGE,
  ]);

  function getBreadcrumbs(currPath: string): any[] {
    // 1. When we reach the root, return the array with Home route
    if (currPath === "") return [HOMEPAGE];

    // 2. Continue building the breadcrumb for the parent's path
    const parentRoutes = getBreadcrumbs(
      currPath.slice(0, currPath.lastIndexOf("/")),
    );

    // 3. Get the matching route object
    const founds = routes.filter((r) => isMathPatternPath(r.path, currPath));
    const matchRoute =
      founds.length > 1 ? founds.find((r) => r.path === currPath) : founds[0];

    // 4. Return the merged array with the new matching route
    return [
      ...parentRoutes,
      {
        path: currPath,
        // TODO
        name:
          matchRoute?.meta?.breadcrumb ||
          matchRoute?.name ||
          matchRoute?.path ||
          currPath,
      },
    ];
  }
  watch(
    () => ({
      path: route.path,
      name: route.name,
      meta: route.meta,
      matched: route.matched,
    }),
    (route) => {
      if (route.path === "/") return;

      breadcrumbs.value = getBreadcrumbs(route.path);
    },
    {
      immediate: true,
    },
  );
  return {
    breadcrumbs,
  };
};
const isMathPatternPath = (pathA: string, pathB: string) => {
  const partsA = pathA.split("/");
  const partsB = pathB.split("/");

  if (partsA.length !== partsB.length) return false;

  const isMatch = partsA.every((part: string, i: number) => {
    return part === partsB[i] || part.startsWith(":");
  });

  return isMatch;
};
