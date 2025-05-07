"use client";
import { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  Image,
  NumberInput,
} from "@heroui/react";
import { Icon } from "@iconify/react";
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [cardType, setCardType] = useState("visa-line");
  const [name, setName] = useState("Anil Bhatt");
  const [cvvnumber, setcvvnumber] = useState("****");
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YYYY");
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setCardType(detectCardType(value));
  };
  const groups = inputValue.match(/.{1,4}/g) || [];

  const handlenameChange = (e: any) => {
    setName(e.target.value);
  };

  const handlecvvChange = (e: any) => {
    const value = e.target.value;

    // Only allow numbers and up to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setcvvnumber(value);
    }
  };

  const handlemonthChange = (value: any) => {
    setMonth(value);
  };

  const handleyearChange = (value: any) => {
    setYear(value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\D/g, "");

    if (/^4/.test(cleaned)) return "ri:visa-line";
    if (/^5[1-5]/.test(cleaned)) return "ri:mastercard-line";
    if (/^3[47]/.test(cleaned)) return "lineicons:amex";
    if (/^6(?:011|5)/.test(cleaned)) return "formkit:discover";

    return "";
  };

  const monthpicks = [
    { key: "Jan", label: "Jan" },
    { key: "Feb", label: "Feb" },
    { key: "Mar", label: "Mar" },
    { key: "Apr", label: "Apr" },
    { key: "May", label: "May" },
    { key: "Jun", label: "Jun" },
    { key: "July", label: "Jul" },
    { key: "Aug", label: "Aug" },
    { key: "Sep", label: "Sep" },
    { key: "Oct", label: "Oct" },
    { key: "Nov", label: "Nov" },
    { key: "Dec", label: "Dec" },
  ];

  const yearspicks = [
    { key: "2025", label: "2025" },
    { key: "2026", label: "2026" },
    { key: "2027", label: "2028" },
  ];
  return (
    <section className="bg-[#d4eafd] h-[100vh] w-[100%] flex items-center justify-center pt-[120px]">
      <Form className="bg-white p-5 rounded-[10px] w-[550px] pt-[100px] relative">
        <div className="absolute top-[-200px] left-0 right-0 w-[90%] mx-auto">
          <div
            className={
              !isFocused
                ? "rotateflip transition-transform duration-1000 relative relative"
                : "rotateflipclick transition-transform duration-1000 relative"
            }
          >
            <div className="relative">
              <Image src="img/card-1.jpg" className="w-[100%]  " alt="" />
            </div>

            <div>
              <div
                className={
                  !isFocused
                    ? "block backface-visible"
                    : "hidden backface-visible"
                }
              >
                <div className="absolute right-5 top-2 z-[99]">
                  <Icon
                    icon={`${cardType}`}
                    className="text-[#ffffff] text-[50px]"
                    width="60"
                    height="60"
                  />
                </div>
                <div className="absolute top-0 bottom-0 z-[99] flex items-center justify-center m-auto px-5">
                  <ul className="flex gap-5 w-full justify-center">
                    {[0, 1, 2, 3].map((i) => (
                      <li
                        key={i}
                        className="text-white text-[35px] w-[80px] text-center "
                      >
                        {groups[i] || "####"}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-[10px] text-white z-[99] left-5">
                  <label className="text-white text-[14px]">Card Holder</label>
                  {name && <h5 className="text-white text-[18px]">{name}</h5>}
                </div>

                <div className="absolute bottom-[10px] text-white z-[99] right-5">
                  <label className="text-white text-[14px]">Expires</label>
                  <div className="flex gap-2">
                    {month && (
                      <h5 className="text-white text-[18px]">{month}</h5>
                    )}
                    <span className="text-white text-[18px]">/</span>
                    {year && <h5 className="text-white text-[18px]">{year}</h5>}
                  </div>
                </div>
              </div>

              <div
                className={
                  !isFocused
                    ? "hidden backface-visible"
                    : "block backface-visible"
                }
                ref={ref}
              >
                <div className="bg-black h-[50px] w-full absolute top-[30px] z-[99]"></div>
                <div className="bg-white h-[50px] w-full absolute bottom-[50px] z-[99] cardBack">
                  <h5 className="text-black text-[16px] text-right block px-5 pt-3">
                    {cvvnumber}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-5">
            <label className="text-black font-semibold text-[16px]">
              Card Number{" "}
            </label>
            <Input
              isRequired
              errorMessage={({ validationDetails, validationErrors }) => {
                if (validationDetails.typeMismatch) {
                  return "Please enter 16 Digit Card Number";
                }

                return validationErrors;
              }}
              type="number"
              maxLength={16}
              className="light text-foreground bg-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-black text-[16px]"
              variant="bordered"
              value={inputValue}
              onChange={handleChange}
              classNames={{
                base: "border:none",
                inputWrapper:
                  "border-2 border-solid border-[#e4e8ee] w-full h-[50px] rounded-[5px] ",
              }}
            />
          </div>

          <div className=" mb-5">
            <label className="text-black font-semibold text-[16px]">
              Card Name{" "}
            </label>
            <Input
              isRequired
              type="text"
              variant="bordered"
              className="text-black text-[16px] light text-foreground bg-background"
              onChange={handlenameChange}
              classNames={{
                base: "border:none",
                inputWrapper:
                  "border-2 border-solid border-[#e4e8ee] w-full h-[50px] rounded-[5px]",
              }}
            />
          </div>
        </div>
        <div className="flex gap-[10px] w-full">
          <div className="w-full">
            <label className="text-black font-semibold text-[16px]">
              Expiration Date{" "}
            </label>
            <div className="flex gap-[10px] mb-5">
              <Select
                isRequired
                className="w-full text-black text-[16px] light text-foreground bg-background"
                label="Months"
                variant="bordered"
                onChange={(e) => handlemonthChange(e.target.value)}
                classNames={{
                  trigger:
                    "border-2 border-solid border-[#e4e8ee] w-full h-[50px] rounded-[5px]",
                }}
              >
                {monthpicks.map((monthpick) => (
                  <SelectItem key={monthpick.key}>{monthpick.label}</SelectItem>
                ))}
              </Select>

              <Select
                isRequired
                className="w-full text-black text-[16px] light text-foreground bg-background"
                label="Year"
                variant="bordered"
                onChange={(e) => handleyearChange(e.target.value)}
                classNames={{
                  trigger:
                    "border-2 border-solid border-[#e4e8ee] w-full h-[50px] rounded-[5px] ",
                }}
              >
                {yearspicks.map((yearspick) => (
                  <SelectItem key={yearspick.key}>{yearspick.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <label className="text-black font-semibold text-[16px]">CVV </label>
            <Input
              isRequired
              inputMode="numeric"
              onFocus={() => setIsFocused(true)}
              type="number"
              pattern="[0-9]*"
              onChange={handlecvvChange}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full text-black text-[16px] light text-foreground bg-background"
              variant="bordered"
              classNames={{
                base: "border:none w-[100px]",
                inputWrapper:
                  "border-2 border-solid border-[#e4e8ee] w-[100px] h-[55px] rounded-[5px]",
              }}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] rounded-[5px] text-[18px] bg-[#0055d4] text-white"
        >
          Submit
        </Button>
      </Form>
    </section>
  );
}
