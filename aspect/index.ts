import {
  allocate,
  entryPoint,
  execute,
  IAspectOperation,
  IPreContractCallJP,
  OperationInput,
  InitInput,
  PreContractCallInput,
  sys,
  uint8ArrayToHex,
} from "@artela-next/aspect-libs";

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
    return uint8ArrayToHex(sender) == uint8ArrayToHex(sys.aspect.property.get<Uint8Array>("owner"));
  }

  preContractCall(input: PreContractCallInput): void {
    // 👉 fill the logics here below...

    // retrieve the black list status of the caller
    const blackListed = sys.aspect.mutableState.get<bool>(`blacklist_${uint8ArrayToHex(input.call!.from)}`).unwrap();

    // check if the caller is blacklisted, revert if caller is blocked
    sys.require(!blackListed, "caller is blacklisted");
  }

  operation(input: OperationInput): Uint8Array {
    // 👉 fill the logics here below...
    // only owner can update the black list
    sys.require(this.isOwner(input.tx!.from), "caller is not authorized");

    // check the first byte, 1 for add, others for remove
    const add = input.callData[0] == 1;

    // extract the address to add to the blacklist
    const address = input.callData.slice(1);

    // validate the address length
    sys.require(address.length == 20, "invalid address length");

    // save the address to black list
    sys.aspect.mutableState.get<bool>(`blacklist_${uint8ArrayToHex(address)}`).set(add);

    return new Uint8Array(0);
  }

  init(input: InitInput): void {
  }
}

// 2.register aspect Instance
const aspect = new Aspect();
entryPoint.setAspect(aspect);
entryPoint.setOperationAspect(aspect);

// 3.must export it
export { execute, allocate };
