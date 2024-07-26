import {
  allocate,
  entryPoint,
  execute,
  IAspectOperation,
  IPreContractCallJP,
  OperationInput,
  PreContractCallInput,
  sys,
  uint8ArrayToHex,
} from "@artela/aspect-libs";

/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPreContractCallJP, IAspectOperation {
  /**
   * isOwner is the governance account implemented by the Aspect, when any of the governance operation
   * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
   * against the initiator's account to make sure it has the permission.
   *
   * @param sender address of the transaction
   * @return true if check success, false if check fail
   */
  isOwner(sender: Uint8Array): bool {
    // 👉 fill the logics here below...
    return false;
  }

  preContractCall(input: PreContractCallInput): void {
    // 👉 fill the logics here below...

    // retrieve the black list status of the caller
    
    // check if the caller is blacklisted, revert if caller is blocked

  }

  operation(input: OperationInput): Uint8Array {
    // 👉 fill the logics here below...
    // only owner can update the black list

    // check the first byte, 1 for add, others for remove

    // extract the address to add to the blacklist

    // validate the address length

    // save the address to black list
    
    return new Uint8Array(0);
  }
}

// 2.register aspect Instance
const aspect = new Aspect();
entryPoint.setAspect(aspect);
entryPoint.setOperationAspect(aspect);

// 3.must export it
export { execute, allocate };
