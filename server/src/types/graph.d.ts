export const typeDefs = ["type GetChatByIdResponse {\n  ok: Boolean!\n  err: String\n  chat: Chat\n}\n\ntype Query {\n  GetChatById(chatId: Int!): GetChatByIdResponse!\n  GetMyPlace: GetMyPlaceResponse!\n  GetNearbyRides: GetNearbyRidesResponse!\n  GetRide(rideId: Int!): GetRideResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetNearbyDrivers: GetNearbyDriversResponse!\n  Me: MeResponse!\n  users: [User]\n  GetValidation(email: String!): GetValidationResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n  NearbyRideSubscription: Ride\n  RideStatusSubscription: Ride\n  StatusSubscription(rideId: Int!): Ride\n  DriversSubscription: User\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  err: String\n  message: Message\n}\n\ntype Mutation {\n  SendMessage(text: String!, chatId: Int!): SendMessageResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(placeId: Int!, name: String, isFav: Boolean): EditPlaceResponse!\n  AcceptRide(rideId: Int!): AcceptRideResponse!\n  RequestRide(pickUpAddress: String!, pickUpLat: Float!, pickUpLng: Float!, dropOffAddress: String!, dropOffLat: Float!, dropOffLng: Float!, duration: String!, distance: String!, price: Float!, rideImage: String!): RequestRideResponse!\n  UpdateRideStatus(rideId: Int!, status: StatusOptions!): UpdateRideStatusResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  ValidateEmail(key: String!): ValidateEmailResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, phoneNumber: String!, profilePhoto: String): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  ReportMovement(lastOrientation: Float, lastLat: Float, lastLng: Float): ReportMovementResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n  UpdateMyProfile(firstName: String, password: String, lastName: String, profilePhoto: String, email: String): UpdateMyProfileResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  passengerId: Int\n  passenger: User\n  driverId: Int\n  driver: User\n  ride: Ride\n  rideId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  chatId: Int\n  userId: Int\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype GetMyPlaceResponse {\n  ok: Boolean!\n  err: String\n  places: [Place]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AcceptRideResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype GetNearbyRidesResponse {\n  ok: Boolean!\n  err: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  ok: Boolean!\n  err: String\n  ride: Ride\n}\n\ntype RequestRideResponse {\n  ok: Boolean!\n  err: String\n  ride: Ride\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float\n  distance: String\n  duration: String\n  driverId: Int\n  driver: User\n  passengerId: Int\n  passenger: User\n  chat: Chat\n  chatId: Int\n  rideImage: String\n  currentUsers: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateRideStatusResponse {\n  ok: Boolean!\n  err: String\n  rideId: Int\n}\n\nenum StatusOptions {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTING\n  ONROUTE\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ValidateEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetNearbyDriversResponse {\n  ok: Boolean!\n  err: String\n  drivers: [User]\n}\n\ntype MeResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  fbId: String\n  places: [Place]\n  messages: [Message]\n  ridesAsPassenger: [Ride]\n  ridesAsDriver: [Ride]\n  chatsAsPassenger: [Chat]\n  chatsAsDriver: [Chat]\n  currentRide: Ride\n  currentRideId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetValidationResponse {\n  ok: Boolean!\n  error: String\n  verification: Verification\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChatById: GetChatByIdResponse;
  GetMyPlace: GetMyPlaceResponse;
  GetNearbyRides: GetNearbyRidesResponse;
  GetRide: GetRideResponse;
  GetMyProfile: GetMyProfileResponse;
  GetNearbyDrivers: GetNearbyDriversResponse;
  Me: MeResponse;
  users: Array<User> | null;
  GetValidation: GetValidationResponse;
}

export interface GetChatByIdQueryArgs {
  chatId: number;
}

export interface GetRideQueryArgs {
  rideId: number;
}

export interface GetValidationQueryArgs {
  email: string;
}

export interface GetChatByIdResponse {
  ok: boolean;
  err: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  passengerId: number | null;
  passenger: User | null;
  driverId: number | null;
  driver: User | null;
  ride: Ride | null;
  rideId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  chatId: number | null;
  userId: number | null;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  places: Array<Place> | null;
  messages: Array<Message> | null;
  ridesAsPassenger: Array<Ride> | null;
  ridesAsDriver: Array<Ride> | null;
  chatsAsPassenger: Array<Chat> | null;
  chatsAsDriver: Array<Chat> | null;
  currentRide: Ride | null;
  currentRideId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
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
  driverId: number | null;
  driver: User | null;
  passengerId: number | null;
  passenger: User | null;
  chat: Chat | null;
  chatId: number | null;
  rideImage: string | null;
  currentUsers: Array<User> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyPlaceResponse {
  ok: boolean;
  err: string | null;
  places: Array<Place> | null;
}

export interface GetNearbyRidesResponse {
  ok: boolean;
  err: string | null;
  ride: Ride | null;
}

export interface GetRideResponse {
  ok: boolean;
  err: string | null;
  ride: Ride | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetNearbyDriversResponse {
  ok: boolean;
  err: string | null;
  drivers: Array<User> | null;
}

export interface MeResponse {
  ok: boolean;
  err: string | null;
  user: User | null;
}

export interface GetValidationResponse {
  ok: boolean;
  error: string | null;
  verification: Verification | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  SendMessage: SendMessageResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  AcceptRide: AcceptRideResponse;
  RequestRide: RequestRideResponse;
  UpdateRideStatus: UpdateRideStatusResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  ValidateEmail: ValidateEmailResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  ReportMovement: ReportMovementResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleDrivingMode: ToggleDrivingModeResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface SendMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  placeId: number;
  name: string | null;
  isFav: boolean | null;
}

export interface AcceptRideMutationArgs {
  rideId: number;
}

export interface RequestRideMutationArgs {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  duration: string;
  distance: string;
  price: number;
  rideImage: string;
}

export interface UpdateRideStatusMutationArgs {
  rideId: number;
  status: StatusOptions;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface ValidateEmailMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePhoto: string | null;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface ReportMovementMutationArgs {
  lastOrientation: number | null;
  lastLat: number | null;
  lastLng: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  password: string | null;
  lastName: string | null;
  profilePhoto: string | null;
  email: string | null;
}

export interface SendMessageResponse {
  ok: boolean;
  err: string | null;
  message: Message | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  err: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  err: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  err: string | null;
}

export interface AcceptRideResponse {
  ok: boolean;
  err: string | null;
}

export interface RequestRideResponse {
  ok: boolean;
  err: string | null;
  ride: Ride | null;
}

export type StatusOptions = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";

export interface UpdateRideStatusResponse {
  ok: boolean;
  err: string | null;
  rideId: number | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ValidateEmailResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  err: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  ok: boolean;
  err: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
  NearbyRideSubscription: Ride | null;
  RideStatusSubscription: Ride | null;
  StatusSubscription: Ride | null;
  DriversSubscription: User | null;
}

export interface StatusSubscriptionSubscriptionArgs {
  rideId: number;
}
