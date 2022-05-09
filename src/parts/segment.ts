
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Expo } from "gsap";
import { Rect } from "../libs/rect";
import { Point } from "../libs/point";
import { Util } from "../libs/util";
import { Func } from "../core/func";

// -----------------------------------------
//
// -----------------------------------------
export class Segment extends MyDisplay {

  private _id:number;
  private _slider:any;
  private _rot:number = 0; // 度数表記
  private _pos:Point = new Point();
  private _size:Rect = new Rect();

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;

    // スライダー
    this._slider = document.createElement('input');
    this._slider.setAttribute('type', 'range');
    this._slider.setAttribute('min', '0');
    this._slider.setAttribute('max', '100');
    this._slider.setAttribute('step', '1');
    this.getEl().append(this._slider);

    // スライダー行ったり来たりさせる
    this._motion(this._id * 0.05);

    this._resize();
  }


  private _motion(delay:number = 0): void {
    Tween.instance.a(this._slider, {
      value:[0, 100]
    }, 1, delay, Expo.easeInOut, null, null, () => {
      Tween.instance.a(this._slider, {
        value:0
      }, 1, 0, Expo.easeInOut, null, null, () => {
        this._motion();
      })
    })
  }


  public setRot(val:number): void {
    this._rot = val;
  }


  public getRot(): number {
    return this._rot;
  }


  public setPos(x:number, y:number): void {
    this._pos.x = x;
    this._pos.y = y;
  }


  public getPos(): Point {
    return this._pos;
  }


  public getPin(): Point {
    const radian = Util.instance.radian(this._rot);
    const x = this._pos.x + Math.cos(radian) * this._size.width;
    const y = this._pos.y + Math.sin(radian) * this._size.width;

    return new Point(x, y);
  }


  protected _resize(): void {
    super._resize();

    const itemW = Func.instance.val(50, Func.instance.sw() * 0.06);
    const itemH = 20;

    this._size.width = itemW;
    this._size.height = itemH;

    Tween.instance.set(this._slider, {
      width: this._size.width,
      height: this._size.height,
      y:-this._size.height * 0.5
    })
  }

}