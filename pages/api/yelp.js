import yelp from "yelp-fusion";

export default function handler(req, res) {
  const apiKey = process.env.YELP_API_KEY;
  let location = req.body.selectedCity;

  const searchRequest = {
    limit: 50, // limitを指定しないと結果を20件までしか取得できない。最大50件まで。
    location: `${location}`,
    categories: "vegetarian",
  };

  const client = yelp.client(apiKey);

  client
    .search(searchRequest)
    .then((response) => {
      const prettyJson = JSON.stringify(response, null, 4);
      // console.log(prettyJson);
      res.status(200).json(prettyJson);
    })
    .catch((e) => {
      console.log(e);
    });
}
