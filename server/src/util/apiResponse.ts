export class APIResponse {
  public success: boolean;
  constructor(
    public statuscode: number,
    public data: unknown,
    public message = 'Success'
  ) {
    this.success = statuscode < 400;
  }
}
