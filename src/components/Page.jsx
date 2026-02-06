

/* eslint-disable react/prop-types */
export default function Page({ showLogos = false, extraContentClassName = "", children }) {
  return (
    <div
      className="min-h-screen bg-white flex flex-col p-4 xl:p-8 2xl:p-16 text-[#001744]"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >


      <main className=" flex-1 flex">


        <div className="flex gap-8 xl:gap-16 flex-1">
          <div
            className="hidden md:block md:flex-1 rounded-[1.5rem] 2xl:rounded-[2.5rem] bg-no-repeat bg-cover bg-right 
  bg-[url('./carte-sanitaire-niger.png')]"
          >

          </div>

          <div className="flex flex-1 flex-col my-auto  space-between h-full  ">
            {showLogos && <div className="flex mb-8 justify-center items-center" >
              <img
                src="./logo-ministere-niger.jpeg"
                alt="Ministère de la santé"
                className="h-35 2xl:h-65 object-contain"
              />
            </div>}


            <div className={"flex flex-1 flex-col justify-start " + extraContentClassName}>
              {children}
            </div>



            <div className=" py-6">
              {showLogos && <div className={`container mx-auto flex flex-wrap justify-center gap-4 xl:gap-10 px-4`}>
                <a href="https://www.enabel.be/fr/" target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-8 object-contain"
                    src="logo-enabel.png"
                    alt="Enabel"
                  />
                </a>

                <a href="https://www.bluesquarehub.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-8 object-contain"
                    src="blsq.png"
                    alt="Bluesquare"
                  />
                </a>

              </div>
              }
            </div>

          </div>

        </div>
      </main>





    </div>
  );
}
