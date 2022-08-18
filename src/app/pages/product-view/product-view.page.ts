import { Location } from "@angular/common";
import { escapeRegExp } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "../../services/rest.service";
import { UtilService } from "../../services/util.service";

@Component({
  selector: "app-product-view",
  templateUrl: "./product-view.page.html",
  styleUrls: ["./product-view.page.scss"],
})
export class ProductViewPage implements OnInit {
  currency: any;
  id: any;
  services: any = [];
  searchform:FormGroup;
  type: any;
  foo: { [k: string]: any; };
  constructor(
    private api: RestService,
    private util: UtilService,
    private router: Router,
    private loc: Location,
    private fb:FormBuilder,
    private route:ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.id = this.router.getCurrentNavigation().extras.state.id;
    }

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.foo= this.router.getCurrentNavigation().extras.state;
        console.log(this.foo);
        // this.product=this.foo.product;
        // this.total=this.foo.product.cost * this.foo.quantity;
      }
    });
  }
  productName: string = "";
  quantity = 0;
  products: any = [];
  cartData = [];
  ngOnInit() {
    this.searchform=this.fb.group({
      term:['']
    })
    this.util.startLoad();
    // this.productName = this.api.service_name;
    this.currency = localStorage.getItem("currency_symbol");
    let data = {
      service_id: localStorage.getItem("product-id"),
    };
    this.cartData = JSON.parse(localStorage.getItem("cart-data"))
      ? JSON.parse(localStorage.getItem("cart-data"))
      : [];
    this.api.getWithHeader("products").subscribe(
      (success: any) => {
        console.log(success);

        this.products = success.products;

        this.products.forEach((element) => {
          element.quantity = this.quantityGet(element.id);
        });
        this.util.stopload();
      },
      (err) => {
        this.util.error(err);
        this.util.stopload();
      }
    );

    // this.api.getData("settings").subscribe(
    //   (success: any) => {
    //     this.type = success.data.cloth_unit;
    //   },
    //   (err) => {}
    // );
  }

  addToCart(item) {
    // console.log(item);

    item.quantity = item.quantity + 1;
    let data = {
      single_service_id: this.id,
      quantity: item.quantity,
      name: item.name,
      cost: item.cost,
      total: JSON.parse(item.cost),
      type: item.type,
      sku:item.product_sku,
      weight:item.weight
    };
    this.cartData = JSON.parse(localStorage.getItem("cart-data"))
      ? JSON.parse(localStorage.getItem("cart-data"))
      : [];

    if (this.cartData.length > 0) {
      let product = this.cartData.find((e) => e.id == item.id);

      if (product && product.service) {
        const single = product.service.find(
          (e) => e.single_service_id == this.id
        );
        if (single) {
          single.quantity += 1;
          single.cost = item.cost;
          single.total = item.cost * single.quantity;
        } else {
          product.service.push(data);
        }
      } else {
        product = item;
        product.service = [];
        product.service.push(data);
        this.cartData.push(product);
      }
    } else {
      item.service = [];

      item.service.total = 1 * JSON.parse(data.cost);
      item.service.push(data);
      this.cartData.push(item);
    }

    localStorage.setItem("cart-data", JSON.stringify(this.cartData));
    localStorage.setItem("cart-data", JSON.stringify(this.cartData));
  }

  back() {
    this.loc.back();
  }

  minusFromCart(item) {
    if (item.quantity !== 0) {
      item.quantity--;
      item.total = item.quantity * item.cost;
      let data = {
        single_service_id: this.id,
        quantity: item.quantity,
        total: item.total,
        name: item.name,
        cost: item.cost,
        type: item.type,
        sku:item.product_sku,
        weight:item.weight
      };
      let product = this.cartData.find((e) => e.id == item.id);

      if (product && product.service) {
        const single = product.service.find(
          (e) => e.single_service_id == this.id
        );
        if (single) {
          if (product.service.length != 0)
            if (single.quantity != 1) {
              single.quantity--;
              single.cost = item.cost;

              single.total = item.cost * single.quantity;
            } else {
              const index = product.service.indexOf(single, 0);

              if (index > -1) {
                product.service.splice(index, 1);
                if (product.service.length == 0) {
                  const cindex = this.cartData.indexOf(product, 0);
                  if (cindex > -1) {
                    this.cartData.splice(cindex, 1);
                  }
                }
              }
            }
        } else {
          product.service.splice(data);
        }
      } else {
        product = item;
        product.service = [];
        product.service.splice(data);
        this.cartData.splice(product);
      }
    }
    localStorage.setItem("cart-data", JSON.stringify(this.cartData));
  }

  quantityGet(id) {
    let product = this.cartData.find((e) => e.id == id);

    if (product) {
      const single = product.service.find(
        (e) => e.single_service_id == this.id
      );

      if (single) {
        return single.quantity;
      } else {
        return 0;
      }
    }
    return 0;
  }
}
