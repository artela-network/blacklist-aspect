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
    return uint8ArrayToHex(sys.aspect.property.get<Uint8Array>("owner")) == uint8ArrayToHex(sender);
  }

  preContractCall(input: PreContractCallInput): void {
    // retrieve the black list status of the caller
    const blackListed = sys.aspect.mutableState
      .get<bool>(`black_list_${uint8ArrayToHex(input.call!.from)}`)
      .unwrap();

    // check if the caller is blacklisted, revert if caller is blocked
    sys.require(!blackListed, "blacklisted address");
  }

  operation(input: OperationInput): Uint8Array {
    // only owner can update the black list
    sys.require(this.isOwner(input.tx!.from), "caller is not authorized");

    // check the first byte, 1 for add, others for remove
    const add = input.callData[0] == 1;
    // extract the address to add to the blacklist
    const address = input.callData.subarray(1);
    // validate the address length
    sys.require(address.length == 20, "invalid address");

    // save the address to black list
    sys.aspect.mutableState
      .get<bool>(`black_list_${uint8ArrayToHex(address)}`)
      .set(add);

    return new Uint8Array(0);
  }
}

// 2.register aspect Instance
const aspect = new Aspect();
entryPoint.setAspect(aspect);
entryPoint.setOperationAspect(aspect);

// 3.must export it
export { execute, allocate };
