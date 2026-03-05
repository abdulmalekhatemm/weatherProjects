



import "./App.css";
import { Container, createTheme, ThemeProvider } from "@mui/material";

// REACT
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI COMPONENT
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// EXTERNAL LIBRARY
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import "moment/locale/ar";
import "moment/locale/en-gb";

import "./i18n";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

let cancelAxios = null;

function App() {

  const { t, i18n } = useTranslation();

  const [locale, setLocales] = useState("ar");

  const direaction = locale == "ar" ? "rtl" : "ltr";

  const [dateAndTime, setDateAndDate] = useState("");

  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  function handleLanguageClick() {

    if (locale == "en") {
      setLocales("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");

    } else {
      setLocales("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
  }

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {

    setDateAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=15.3547&lon=44.2067&appid=9935f32bd13f8de3d94a5fda625353f1",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {

        const responTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responsIcon = response.data.weather[0].icon;

        setTemp({
          number: responTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responsIcon}@2x.png`,
        });

      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">

          <div>

            {/* CARD */}

            <div
              dir={direaction}
              style={{
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.5)",
              }}
            >

              {/* CITY & TIME */}

              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
                dir={direaction}
              >

                <Typography
                  variant="h1"
                  style={{
                    marginRight: "20px",
                    fontWeight: "600",
                  }}
                >
                  {t("city")}
                </Typography>

                <Typography
                  variant="h5"
                  style={{
                    marginRight: "20px",
                  }}
                >
                  {dateAndTime}
                </Typography>

              </div>

              <hr />

              {/* WEATHER */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >

                <div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >

                    <Typography
                      variant="h1"
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {temp.number || 38}
                    </Typography>

                    <img src={temp?.icon} />

                  </div>

                  <Typography variant="h6">
                    {t(temp.description)}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >

                    <h5>{t("min")} : {temp.min || 34}</h5>

                    <h5>|</h5>

                    <h5>{t("max")} : {temp.max || 34}</h5>

                  </div>

                </div>

                <CloudIcon style={{ fontSize: "200px", color: "white" }} />

              </div>

            </div>

            {/* BUTTON */}

            <div
              dir={direaction}
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >

              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={handleLanguageClick}
              >
                {locale == "ar" ? t("english") : t("arabic")}
              </Button>

            </div>

          </div>

        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;