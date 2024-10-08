import openDropdown from "../assets/icons/open-dropdown.svg";
import closeDropdown from "../assets/icons/close-dropdown.svg";
import cineone21 from "../assets/icons/cineone21.svg";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStoreSelector } from "../redux/hooks";
import { IHistory } from "../types/history";
import moment from "moment";

function OrderHistory() {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const { token } = useStoreSelector((state) => state.auth);
    const [getHistory, setHistory] = useState<IHistory[]>([]);

    const toggleDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    useEffect(() => {
        const getDetailOrder = async () => {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/order/history`;
        try {
            const result = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            });
            setHistory(result.data.data);
        } catch (error) {
            console.log(error);
        }
        };
        getDetailOrder();
    }, [token]);

  if (!getHistory || !Array.isArray(getHistory)) {
    return <div className="justify-center items-center text-3xl text-center font-bold p-8">You don't have any order history.</div>;
  }

  return (
    <>
      {getHistory.map((history) => (
        <div className="bg-white w-full h-auto rounded-3xl py-10">
          <div className="flex justify-between items-center pb-10 border-b border-gray-300 px-5 tbt:px-10 mb-7">
            <div>
              <p className="text-[#AAAAAA] font-normal text-[10px] tbt:text-sm">
                {moment(history.date).format("dddd, D MMMM YYYY")} - {moment(history.time).format("LT")}
              </p>
              <p className="font-semibold text-base sm:text-2xl mr-10 sm:mr-0">{history.movie_title}</p>
            </div>
            <div>
              <img src={cineone21} width="100" alt="" />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center px-5 tbt:px-10 space-x-2">
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0">
              <div className="bg-[#00BA8833] flex justify-center items-center w-28 tbt:w-40 rounded-sm">
                <p className="text-[#00BA88] text-[10px] tbt:text-sm font-bold">Ticket in active</p>
              </div>
              <div className="bg-[#1D4ED833] flex justify-center items-center w-28 tbt:w-40 rounded-sm">
                <p className="text-[#1D4ED8] text-[10px] tbt:text-sm font-bold">{history.ticket_status}</p>
              </div>
            </div>
            <div onClick={() => toggleDropdown(history.id)} className="flex flex-row items-center space-x-5 cursor-pointer">
              <p className="text-[10px] tbt:text-base">Show Details</p>
              <img src={openDropdownId === history.id ? openDropdown : closeDropdown} width="20" alt="" />
            </div>
          </div>

          {openDropdownId === history.id && (
            <div className="mt-5 mx-10">
              <div>
                <p className="mb-5">Ticket Information</p>
                <div className="flex flex-col md:flex-row items-center px-5 gap-5 space-y-10 md:space-y-0">
                  <QRCode value={history.id || "Default Value"} size={135} />
                  <div className="space-y-5">
                    <div className="grid grid-cols-2">
                      <div>
                        <p className="font-semibold text-xs text-[#AAAAAA]">Category</p>
                        <p className="font-semibold text-sm text-[#14142B]">{history.genres}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-[#AAAAAA]">Time</p>
                        <p className="font-semibold text-sm text-[#14142B]">{moment(history.time).format("LT")}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <p className="font-semibold text-xs text-[#AAAAAA]">Movie</p>
                        <p className="font-semibold text-sm text-[#14142B]">{history.movie_title}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-[#AAAAAA]">Date</p>
                        <p className="font-semibold text-sm text-[#14142B]">{moment(history.date).format("MMM D")}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-[#AAAAAA]">Count</p>
                        <p className="font-semibold text-sm text-[#14142B]">{history.seat_count} pcs</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-sm text-[#000000]">Total</p>
                    <p className="font-semibold text-[#000000]">Rp {history.total}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default OrderHistory;
