import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Detail = () => {
  const [quotes, setQuotes] = useState(null);
  const { data } = useSelector((state) => state.User);
  useEffect(() => {
    async function fetchQuotes() {
      const res = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=fitness",
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      setQuotes(res.data[0]);
    }

    fetchQuotes();
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="mx-auto bg-white drop-shadow-md mt-[1rem] max-w-[50rem] rounded-sm p-10">
        {!quotes ? (
          <div className="flex items-center justify-center md:w-[50rem]">
            <svg
              width="76"
              height="76"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>
                {`.spinner_Wezc {
                transform-origin: center;
                animation: spinner_Oiah .75s step-end infinite;
              }
              @keyframes spinner_Oiah {
                8.3% { transform: rotate(30deg) }
                16.6% { transform: rotate(60deg) }
                25% { transform: rotate(90deg) }
                33.3% { transform: rotate(120deg) }
                41.6% { transform: rotate(150deg) }
                50% { transform: rotate(180deg) }
                58.3% { transform: rotate(210deg) }
                66.6% { transform: rotate(240deg) }
                75% { transform: rotate(270deg) }
                83.3% { transform: rotate(300deg) }
                91.6% { transform: rotate(330deg) }
                100% { transform: rotate(360deg) }
              }`}
              </style>
              <g className="spinner_Wezc">
                <circle cx="12" cy="2.5" r="1.5" opacity=".14" />
                <circle cx="16.75" cy="3.77" r="1.5" opacity=".29" />
                <circle cx="20.23" cy="7.25" r="1.5" opacity=".43" />
                <circle cx="21.50" cy="12.00" r="1.5" opacity=".57" />
                <circle cx="20.23" cy="16.75" r="1.5" opacity=".71" />
                <circle cx="16.75" cy="20.23" r="1.5" opacity=".86" />
                <circle cx="12" cy="21.5" r="1.5" />
              </g>
            </svg>
          </div>
        ) : (
          <div className="text-black">
            <q className="quote">{quotes.quote}</q>
            <h3 className="author">{quotes.author}</h3>
          </div>
        )}

        {data && (
          <div className="break-words">
            <h1 className="mt-4 mb-6 text-4xl font-bold text-center">
              User Detail
            </h1>
            <div className="flex flex-col gap-3 text-lg font-normal">
              <div className="grid grid-cols-2">
                <div>Name</div>
                <div>
                  {data.firstName} {data.lastName}
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>Username</div>
                <div>{data.username}</div>
              </div>
              <div className="grid grid-cols-2">
                <div>Email</div>
                <div>{data.email}</div>
              </div>

              <div className="grid grid-cols-2">
                <div>Password</div>
                <div>{data.password}</div>
              </div>

              <div className="grid grid-cols-2">
                <div>Profile Image </div>
                <img
                  src={data.profileImage}
                  className="max-w-[10rem] max-h-[10rem] rounded-lg drop-shadow-md"
                />
              </div>

              <div className="grid grid-cols-2">
                <div>Cover Image </div>
                <img
                  src={data.coverImage}
                  className="max-w-[10rem] max-h-[10rem] rounded-lg drop-shadow-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
