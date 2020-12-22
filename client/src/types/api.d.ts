/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: isLoggedIn
// ====================================================

export interface isLoggedIn {
  isLoggedIn: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNearbyRides
// ====================================================

export interface GetNearbyRides_GetNearbyRides_ride_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface GetNearbyRides_GetNearbyRides_ride {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number | null;
  distance: string | null;
  duration: string | null;
  passenger: GetNearbyRides_GetNearbyRides_ride_passenger | null;
}

export interface GetNearbyRides_GetNearbyRides {
  __typename: "GetNearbyRidesResponse";
  ok: boolean;
  err: string | null;
  ride: GetNearbyRides_GetNearbyRides_ride | null;
}

export interface GetNearbyRides {
  GetNearbyRides: GetNearbyRides_GetNearbyRides;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: RideStatusSubscription
// ====================================================

export interface RideStatusSubscription_RideStatusSubscription {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number | null;
  distance: string | null;
  duration: string | null;
}

export interface RideStatusSubscription {
  RideStatusSubscription: RideStatusSubscription_RideStatusSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AcceptRide
// ====================================================

export interface AcceptRide_AcceptRide {
  __typename: "AcceptRideResponse";
  ok: boolean;
  err: string | null;
}

export interface AcceptRide {
  AcceptRide: AcceptRide_AcceptRide;
}

export interface AcceptRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestRide
// ====================================================

export interface RequestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface RequestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  err: string | null;
  ride: RequestRide_RequestRide_ride | null;
}

export interface RequestRide {
  RequestRide: RequestRide_RequestRide;
}

export interface RequestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
  rideImage: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNearbyDrivers
// ====================================================

export interface GetNearbyDrivers_GetNearbyDrivers_drivers {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
  lastLat: number | null;
  lastLng: number | null;
}

export interface GetNearbyDrivers_GetNearbyDrivers {
  __typename: "GetNearbyDriversResponse";
  ok: boolean;
  err: string | null;
  drivers: (GetNearbyDrivers_GetNearbyDrivers_drivers | null)[] | null;
}

export interface GetNearbyDrivers {
  GetNearbyDrivers: GetNearbyDrivers_GetNearbyDrivers;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRide
// ====================================================

export interface GetRide_GetRide_ride {
  __typename: "Ride";
  id: number;
  status: string;
}

export interface GetRide_GetRide {
  __typename: "GetRideResponse";
  ok: boolean;
  err: string | null;
  ride: GetRide_GetRide_ride | null;
}

export interface GetRide {
  GetRide: GetRide_GetRide;
}

export interface GetRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleFav
// ====================================================

export interface toggleFav_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  err: string | null;
}

export interface toggleFav {
  EditPlace: toggleFav_EditPlace;
}

export interface toggleFavVariables {
  placeId: number;
  isFav?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPlaceName
// ====================================================

export interface editPlaceName_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  err: string | null;
}

export interface editPlaceName {
  EditPlace: editPlaceName_EditPlace;
}

export interface editPlaceNameVariables {
  placeId: number;
  name?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlace
// ====================================================

export interface addPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  err: string | null;
}

export interface addPlace {
  AddPlace: addPlace_AddPlace;
}

export interface addPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateMyProfile: updateProfile_UpdateMyProfile;
}

export interface updateProfileVariables {
  firstName?: string | null;
  lastName?: string | null;
  profilePhoto?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportMovement
// ====================================================

export interface ReportMovement_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
  err: string | null;
}

export interface ReportMovement {
  ReportMovement: ReportMovement_ReportMovement;
}

export interface ReportMovementVariables {
  lastOrientation?: number | null;
  lastLng?: number | null;
  lastLat?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleDrivingMode
// ====================================================

export interface toggleDrivingMode_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  err: string | null;
}

export interface toggleDrivingMode {
  ToggleDrivingMode: toggleDrivingMode_ToggleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartPhoneVerification
// ====================================================

export interface StartPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerification {
  StartPhoneVerification: StartPhoneVerification_StartPhoneVerification;
}

export interface StartPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignUp
// ====================================================

export interface emailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignUp {
  EmailSignUp: emailSignUp_EmailSignUp;
}

export interface emailSignUpVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePhoto?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestEmailVerification
// ====================================================

export interface requestEmailVerification_RequestEmailVerification {
  __typename: "RequestEmailVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface requestEmailVerification {
  RequestEmailVerification: requestEmailVerification_RequestEmailVerification;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyEmail
// ====================================================

export interface verifyEmail_ValidateEmail {
  __typename: "ValidateEmailResponse";
  ok: boolean;
  error: string | null;
}

export interface verifyEmail {
  ValidateEmail: verifyEmail_ValidateEmail;
}

export interface verifyEmailVariables {
  key: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getValidation
// ====================================================

export interface getValidation_GetValidation_verification {
  __typename: "Verification";
  payload: string;
  key: string;
  verified: boolean;
}

export interface getValidation_GetValidation {
  __typename: "GetValidationResponse";
  ok: boolean;
  error: string | null;
  verification: getValidation_GetValidation_verification | null;
}

export interface getValidation {
  GetValidation: getValidation_GetValidation;
}

export interface getValidationVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface verifyPhone {
  CompletePhoneVerification: verifyPhone_CompletePhoneVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_Me_user_currentRide {
  __typename: "Ride";
  id: number;
}

export interface me_Me_user {
  __typename: "User";
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  fullName: string | null;
  phoneNumber: string | null;
  profilePhoto: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  currentRideId: number | null;
  currentRide: me_Me_user_currentRide | null;
}

export interface me_Me {
  __typename: "MeResponse";
  ok: boolean;
  err: string | null;
  user: me_Me_user | null;
}

export interface me {
  Me: me_Me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaces
// ====================================================

export interface getPlaces_GetMyPlace_places {
  __typename: "Place";
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface getPlaces_GetMyPlace {
  __typename: "GetMyPlaceResponse";
  ok: boolean;
  err: string | null;
  places: (getPlaces_GetMyPlace_places | null)[] | null;
}

export interface getPlaces {
  GetMyPlace: getPlaces_GetMyPlace;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRideStatus
// ====================================================

export interface UpdateRideStatus_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  err: string | null;
}

export interface UpdateRideStatus {
  UpdateRideStatus: UpdateRideStatus_UpdateRideStatus;
}

export interface UpdateRideStatusVariables {
  rideId: number;
  status: StatusOptions;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOptions {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  ONROUTE = "ONROUTE",
  REQUESTING = "REQUESTING",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
