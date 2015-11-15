require 'date'

class Date
	def dayname
		DAYNAMES[self.wday]
	end

	def abbr_dayname
		ABBR_DAYNAMES[self.wday]
	end
end

class DateHelper

	def self.get_week_dates(date)
		return (date.at_beginning_of_week..date.at_end_of_week).map
	end

end
