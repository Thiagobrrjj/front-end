interface FinalPixProps {
  onClose: () => void;
}

const FinalCard = ({ onClose }: FinalPixProps) => {
  return (
    <div className=" fixed top-0 left-0 bg-white shadow-lg z-50 w-screen h-full">
      <div className="p-4">
        <div className="w-full bg-white flex justify-between p-6 border-b border-solid border-gray-300">
          <div className="flex items-center gap-4">
            <div onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="cursor-pointer text-slate-700 iconify iconify--mingcute"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path
                    fill="currentColor"
                    d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="max-w-[48px]">
              <a href="https://www.olx.com.br/">
                <img className="w-full" src="/logo.png" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="cursor-pointer text-slate-300 iconify iconify--ic"
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-8 pb-6 px-4 border-b border-solid border-gray-300">
          <div className="flex gap-4 p-4 bg-yellow-50 rounded-md">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="text-yellow-400 iconify iconify--lucide"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4m0-4h.01"></path>
                </g>
              </svg>
            </div>
            <span className="text-yellow-900">
              Compra em processamento pela Olx Pagamentos LTDA Brasil.
            </span>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
