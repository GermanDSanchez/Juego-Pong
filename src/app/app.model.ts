export interface Ball {
  top: number;
  left: number;
}

export interface Winner {
  left: boolean;
  right: boolean;
}

export interface Arrow {
  left: boolean;
  right: boolean;
}

export interface Der {
  derArriba: boolean;
  derCentro: boolean;
  derAbajo: boolean;
  derMedioAbajo: boolean;
  derMedioArriba: boolean;
}

export interface Izq {
  izqArriba: boolean;
  izqCentro: boolean;
  izqAbajo: boolean;
  izqMedioAbajo: boolean;
  izqMedioArriba: boolean;
}
