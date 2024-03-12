import type {Cart, Game} from "~/types";

export default function () {
    const getGameDetails = async (appid: number): Promise<Game | false> => {
        try {
            const gameResponse = await useFetch(
                `/api/server/v1/game/detail/${appid}`,
                {method: "get"}
            );
            const gameData: Game = gameResponse.data?.value;
            if (!gameData) {
                return false;
            }

            const [totalReviewsResponse, averageRatingResponse, categories] = await Promise.all([
                useFetch(`/api/server/v1/game/totalReviewed/${appid}`, {
                    method: "get",

                }),
                useFetch(`/api/server/v1/game/averageRating/${appid}`, {
                    method: "get",
                    key: "averageRating_" + appid,

                }),
                useFetch(`/api/server/v1/game/categories/${appid}`, {
                    method: "get",
                    key: "categories_" + appid,

                }),
            ]);
            gameData.totalReviewed = totalReviewsResponse.data?.value;
            gameData.averageRating = averageRatingResponse.data?.value;
            gameData.categories = categories.data?.value;

            return gameData;
        } catch (error) {
            console.error("Error fetching game details:", error);
            return false;
        }
    };
    return {getGameDetails};
}