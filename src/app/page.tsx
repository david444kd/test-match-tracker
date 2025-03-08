import Image from "next/image";
import RefreshButton from "./components/RefreshButton";

interface Team {
  name: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: "Finished" | "Ongoing" | "Scheduled";
}

export default async function Page() {
  let matches: Match[] = [];
  let errorMessage: string | null = null;

  try {
    const res = await fetch(
      "https://app.ftoyd.com/fronttemp-service/fronttemp"
    );
    const json = await res.json();
    matches = json.data.matches;
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    errorMessage = "Ошибка: не удалось загрузить информацию";
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="flex items-center justify-between px-4 py-3 bg-neutral-800">
        <div className="flex items-center">
          <h1
            className="
        italic 
        text-[32px] 
        leading-[100%] 
        font-bold
        tracking-normal
      "
            style={{ fontFamily: "Tactic Sans" }}
          >
            Match Tracker
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {errorMessage && (
            <div className="text-red-400 text-sm bg-white/5 px-3 py-2 rounded-md flex items-center justify-center gap-2">
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0123 8.68516V11.0185M12.0123 15.6852V15.6968M3.84556 20.3518H20.1789C20.5596 20.3492 20.9338 20.2534 21.269 20.0729C21.6042 19.8923 21.8901 19.6325 22.1018 19.3161C22.3135 18.9997 22.4446 18.6363 22.4836 18.2576C22.5226 17.8789 22.4683 17.4964 22.3256 17.1435L14.0422 2.85185C13.8404 2.48714 13.5446 2.18315 13.1856 1.97146C12.8266 1.75978 12.4174 1.64813 12.0006 1.64813C11.5838 1.64813 11.1746 1.75978 10.8155 1.97146C10.4565 2.18315 10.1607 2.48714 9.95889 2.85185L1.67556 17.1435C1.53549 17.4884 1.47995 17.8617 1.51357 18.2324C1.54719 18.603 1.66899 18.9603 1.86882 19.2743C2.06864 19.5883 2.34069 19.85 2.66224 20.0374C2.98379 20.2249 3.34552 20.3327 3.71723 20.3518"
                  stroke="#EB0237"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {errorMessage}
            </div>
          )}
          <RefreshButton />
        </div>
      </header>

      <section className="px-20 py-10 mx-auto">
        {errorMessage ? (
          <p className="mt-8 text-center text-lg">
            Попробуйте обновить страницу позже.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {matches.map((match: Match, index: number) => {
              let statusBg = "bg-green-600";
              if (match.status === "Finished") {
                statusBg = "bg-red-600";
              } else if (match.status === "Ongoing") {
                statusBg = "bg-green-600";
              } else if (match.status === "Scheduled") {
                statusBg = "bg-yellow-600";
              }

              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-neutral-800 rounded-md px-4 py-3"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                      <Image
                        src={"/icon.png"}
                        alt="Icon"
                        width={100}
                        height={100}
                      />
                    </div>
                    <span className="font-medium">{match.homeTeam.name}</span>
                  </div>

                  <div className="text-lg font-bold flex flex-col gap-1 justify-center items-center w-1/12">
                    {match.homeScore} : {match.awayScore}
                    <span
                      className={`px-2 py-1 rounded-md text-sm text-white uppercase ${statusBg} w-full flex justify-center`}
                    >
                      {match.status === "Ongoing" ? "Live" : match.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                      <Image
                        src={"/icon.png"}
                        alt="Icon"
                        width={100}
                        height={100}
                      />
                    </div>
                    <span className="font-medium">{match.awayTeam.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
