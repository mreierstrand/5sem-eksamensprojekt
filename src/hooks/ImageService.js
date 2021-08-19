export default function() {
   const upload = async (image) => {
    var link = "";

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Client-ID 0b744b25b1992f2");

    var formdata = new FormData();
    formdata.append("image", image);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch("https://api.imgur.com/3/image", requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        link = result.data.link;
      })
      .catch((error) => console.log("error", error));

    return link;
  };

  return {
    upload,
  };
}
