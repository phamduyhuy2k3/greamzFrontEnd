export const useFile = () => {
    const withBase = (filepath: string) => `/img/${filepath}`;
    return {
        withBase
    }
}