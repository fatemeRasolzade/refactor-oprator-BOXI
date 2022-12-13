export const NationalCodeRegex = /^[0-9]{10}$/g;
export const JustEngPasswordRegex = /^[A-Za-z][A-Za-z0-9]*$/;
export const ComplexPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
export const PostalCodeRegex = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/gm;
export const MobileRegex = /^09\d{9}$/g;
export const JustEngNameRegex = /^[A-Za-z]+$/;

export const NationalCodeValidator = (nationalCode: string, req?: boolean) => {
  if (req && nationalCode === "") {
    return [false, "اجباری است"];
  }
  if (nationalCode.length !== 10) {
    return [false, "کد ملی ده رقم"];
  }
  if (!nationalCode.match(NationalCodeRegex)) {
    return [false, "کد ملی نامعتبر"];
  }
  return [true, ""];
};

export const NationalIDValidator = (nationalId: string, req?: boolean) => {
  let isValid = false;
  let err;
  if (req && nationalId === "") {
    return [false, "اجباری است"];
  }
  if (nationalId.length !== 11) {
    err = "شناسه ملی یازده رقم ";
  } else {
  
    if (parseInt(nationalId.substr(3, 6), 10) === 0) {
      alert("Hellooooooooooo")
      err = "شناسه ملی نامعتبر";
    } else {
    let c = parseInt(nationalId.substr(10, 1), 10);
    let d = parseInt(nationalId.substr(9, 1), 10) + 2;
    let z = new Array(29, 27, 23, 19, 17);
    let s = 0;
    for (let i = 0; i < 10; i++)
      s += (d + parseInt(nationalId.substr(i, 1), 10)) * z[i % 5];
    s = s % 11;
    if (s == 10) s = 0;
    // return (c==s);
    if (c == s) {
      isValid = true;
    } else {
      isValid = false;
      err = "شناسه ملی نامعتبر";
    }
    }
    if (!err) {
      isValid = true;
    }
  }
  return [isValid, err];
};
export const ContactNumberValidate = (contactNumber:any) => {
	let isValidContact = false;
	let errContact;
	let digits = contactNumber.toString(11).replace(/\D/g, "0").split("").map(Number);
	if (contactNumber === "") {
		isValidContact = true;
	} else if (digits.length !== 11 || digits.length !== 11) {
		errContact = "شماره تماس 11 رقم ";
	} else if (
		contactNumber === "00000000000" ||
		contactNumber === "11111111111" ||
		contactNumber === "22222222222" ||
		contactNumber === "33333333333" ||
		contactNumber === "44444444444" ||
		contactNumber === "55555555555" ||
		contactNumber === "66666666666" ||
		contactNumber === "77777777777" ||
		contactNumber === "88888888888" ||
		contactNumber === "99999999999"
	) {
		errContact = "شماره تماس 11 رقم";
	}

	if (!errContact) {
		isValidContact = true;
	}
	return [isValidContact, errContact];
};
export const EconomicCodeValidate = (economicCode: any, req?: boolean) => {
  if (req && economicCode === "") {
    return [false, "اجباری است"];
  }
  if (economicCode.length !== 11 && economicCode.length !== 12) {
    console.log(economicCode.length);
    return [false, " کد اقتصادی یازده یا دوازده رقم"];
  }
  if (economicCode.length === 11) {
    if (!NationalIDValidator(economicCode, req)) {
      return [false, "کد اقتصادی نامعتبر"];
    }
  }
  return [true, ""];
};
