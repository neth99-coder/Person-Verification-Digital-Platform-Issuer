import contract from "@truffle/contract";

export const loadContracts = async (name, provider) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  const _contract = contract(Artifact);
  //console.log(_contract,"Inside util func")
  _contract.setProvider(provider)
  console.log(_contract,"UTIL")

  const deployedContract = _contract.deployed()
  //console.log("deployed", deployedContract)
  return deployedContract;
};
