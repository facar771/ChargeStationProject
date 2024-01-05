package station.chargeStation.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;

import station.chargeStation.entities.concretes.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
}
