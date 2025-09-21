import {Card,editCard,deleteCard,login,getCard} from "../controler/card_controler.js";
import { Router } from "express";
import { upload } from "../middleware/multer.js";
import passwordCheck from "../middleware/password.js";
const route=Router();




route.route("/login").post(login)
route.route("/events").get(getCard)

route.route("/create").post(
  upload.array("image"),
  Card)

  route.route("/edit/:id").put(upload.array("image"),editCard)
  //  route.route("/delete/:id").delete(passwordCheck,deleteCard)
  route.delete("/event/:id",deleteCard);


  export  default route

  